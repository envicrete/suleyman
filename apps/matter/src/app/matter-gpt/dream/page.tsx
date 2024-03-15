'use client';

import type { UploadWidgetConfig } from '@bytescale/upload-widget';
import type { roomType, themeType } from '#/lib/matter-gpt/dropdown-types';

import { useState } from 'react';
import Image from 'next/image';

import { UrlBuilder } from '@bytescale/sdk';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { AnimatePresence, motion } from 'framer-motion';

import LoadingDots from '#/components/loading-dots';
import { CompareSlider } from '#/components/matter-gpt/compare-slider';
import GptDropDown from '#/components/matter-gpt/gpt-dropdown';
import ResizablePanel from '#/components/matter-gpt/resizable-panel';
import Toggle from '#/components/matter-gpt/toggle';
import appendNewToName from '#/lib/matter-gpt/append-new-to-name';
import downloadPhoto from '#/lib/matter-gpt/download-photo';
import { rooms, themes } from '#/lib/matter-gpt/dropdown-types';

interface CircleIconProps {
  text: string;
}

const CircleIcon: React.FC<CircleIconProps> = ({ text }) => {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
      {text}
    </div>
  );
};

const options: UploadWidgetConfig = {
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : 'free',
  maxFileCount: 1,
  mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: '#8D7C88', // Primary buttons & links
      error: '#b91c1c', // Error messages
      shade100: '#ffffff', // Standard text
      shade200: '#f8f9fb', // Secondary button text
      shade300: '#f8f9fb', // Secondary button text (hover)
      shade400: '#666f7a', // Welcome text
      shade500: '#434746', // Modal close button
      shade600: '#cfd2d0', // Border
      shade700: '#666f7a', // Progress indicator background
      shade800: '#666f7a', // File item background
      shade900: '#ffff', // Various (draggable crop buttons, etc.)
    },
  },
};

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>('Modern');
  const [room, setRoom] = useState<roomType>('Living Room');

  const UploadDropZone = () => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }) => {
        if (uploadedFiles.length !== 0) {
          const image = uploadedFiles[0]!; // Use non-null assertion operator here
          const imageName = image.originalFile.originalFileName;
          const imageUrl = UrlBuilder.url({
            accountId: image.accountId,
            filePath: image.filePath,
            options: {
              transformation: 'preset',
              transformationPreset: 'thumbnail',
            },
          });
          setPhotoName(imageName);
          setOriginalPhoto(imageUrl);
          void generatePhoto(imageUrl);
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPhoto = await res.json();
    if (res.status !== 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setError(newPhoto);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setRestoredImage(newPhoto[1]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <div className="mb-8 mt-4 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mb-0">
        <h1 className="mx-auto mb-5 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Design with matterGPT
        </h1>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="mt-4 flex w-full flex-col items-center justify-between">
              {!restoredImage && (
                <>
                  <div className="w-full max-w-sm space-y-4">
                    <div className="my-3 flex items-center space-x-3">
                      <CircleIcon text="1" />
                      <p className="text-left font-medium text-muted-foreground">
                        Choose a design theme
                      </p>
                    </div>
                    <GptDropDown
                      theme={theme}
                      setTheme={(newTheme) =>
                        setTheme(newTheme as typeof theme)
                      }
                      themes={themes}
                    />
                  </div>
                  <div className="w-full max-w-sm space-y-4">
                    <div className="mb-3 mt-10 flex items-center space-x-3">
                      <CircleIcon text="2" />
                      <p className="text-left font-medium text-muted-foreground">
                        Choose your room type
                      </p>
                    </div>
                    <GptDropDown
                      theme={room}
                      setTheme={(newRoom) => setRoom(newRoom as typeof room)}
                      themes={rooms}
                    />
                  </div>
                  <div className="mt-4 w-full max-w-sm">
                    <div className="mt-6 flex w-96 items-center space-x-3">
                      <CircleIcon text="3" />
                      <p className="text-left font-medium text-muted-foreground">
                        Upload a picture of your room
                      </p>
                    </div>
                  </div>
                </>
              )}
              {restoredImage && (
                <div>
                  Here&apos;s how your remodeled <b>{room.toLowerCase()}</b> in
                  the <b>{theme.toLowerCase()}</b> theme will look with{' '}
                  <b>Matter</b> by Envicrete.{' '}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? 'visible -ml-8 mt-6' : 'invisible'
                }`}
              >
                <Toggle
                  className={`${restoredLoaded ? 'visible mb-6' : 'invisible'}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}
              {!originalPhoto && <UploadDropZone />}
              {originalPhoto && !restoredImage && (
                <Image
                  alt="original photo"
                  src={originalPhoto}
                  className="h-96 rounded-2xl"
                  width={475}
                  height={475}
                />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div>
                    <h2 className="mb-1 text-lg font-medium">Original Room</h2>
                    <Image
                      alt="original photo"
                      src={originalPhoto}
                      className="relative h-96 w-full rounded-2xl"
                      width={475}
                      height={475}
                    />
                  </div>
                  <div className="mt-8 sm:mt-0">
                    <h2 className="mb-1 text-lg font-medium">
                      Matter Dream Room
                    </h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <Image
                        alt="restored photo"
                        src={restoredImage}
                        className="relative mt-2 h-96 w-full cursor-zoom-in rounded-2xl sm:mt-0"
                        width={475}
                        height={475}
                        onLoadingComplete={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button
                  disabled
                  className="mt-8 w-40 rounded-full bg-muted-foreground px-4 pb-3 pt-2 font-medium text-white"
                >
                  <span className="pt-4">
                    <LoadingDots className="bg-white" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="mt-8 rounded-xl border border-destructive bg-red-100 px-4 py-3 text-destructive"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="flex justify-center space-x-2">
                {originalPhoto && !loading && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="mt-8 rounded-full bg-muted px-4 py-2 font-medium text-foreground transition hover:bg-muted/80"
                  >
                    New room
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(
                        restoredImage!,
                        appendNewToName(photoName!),
                      );
                    }}
                    className="mt-8 rounded-full border bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primary/80"
                  >
                    Download
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </div>
  );
}

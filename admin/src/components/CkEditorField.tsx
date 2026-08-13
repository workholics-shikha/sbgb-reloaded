import { useEffect, useId, useRef } from 'react';

declare global {
  interface Window {
    ClassicEditor?: {
      create: (
        element: HTMLElement,
        config?: Record<string, unknown>
      ) => Promise<{
        destroy: () => Promise<void>;
        getData: () => string;
        setData: (value: string) => void;
        model: {
          document: {
            on: (event: string, handler: () => void) => void;
          };
        };
      }>;
    };
  }
}

const CKEDITOR_SCRIPT_ID = 'sbgbt-ckeditor-script';
const CKEDITOR_SCRIPT_SRC =
  'https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js';

let scriptPromise: Promise<void> | null = null;

function loadCkEditorScript() {
  if (window.ClassicEditor) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(
      CKEDITOR_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener(
        'error',
        () => reject(new Error('Unable to load CKEditor')),
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.id = CKEDITOR_SCRIPT_ID;
    script.src = CKEDITOR_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load CKEditor'));

    document.body.appendChild(script);
  });

  return scriptPromise;
}

type CkEditorFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function CkEditorField({
  label,
  value,
  onChange,
}: CkEditorFieldProps) {
  const editorElementId = useId();
  const hostRef = useRef<HTMLDivElement | null>(null);

  const editorInstanceRef = useRef<{
    destroy: () => Promise<void>;
    getData: () => string;
    setData: (value: string) => void;
    model: {
      document: {
        on: (event: string, handler: () => void) => void;
      };
    };
  } | null>(null);

  // Keep latest value available when CKEditor loads asynchronously
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Create CKEditor
  useEffect(() => {
    let isMounted = true;

    loadCkEditorScript()
      .then(async () => {
        if (
          !isMounted ||
          !hostRef.current ||
          !window.ClassicEditor ||
          editorInstanceRef.current
        ) {
          return;
        }

        const editor = await window.ClassicEditor.create(hostRef.current, {
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'undo',
            'redo',
          ],
        });

        if (!isMounted) {
          await editor.destroy();
          return;
        }

        // IMPORTANT: use latest value from API
        editor.setData(valueRef.current || '');

        editor.model.document.on('change:data', () => {
          onChangeRef.current(editor.getData());
        });

        editorInstanceRef.current = editor;
      })
      .catch(() => {
        // Keep the plain host visible if CDN loading fails.
      });

    return () => {
      isMounted = false;

      if (editorInstanceRef.current) {
        void editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  // Update editor whenever API value changes
  useEffect(() => {
    const editor = editorInstanceRef.current;

    if (!editor) {
      return;
    }

    if (editor.getData() !== value) {
      editor.setData(value || '');
    }
  }, [value]);

  return (
    <div>
      <label
        htmlFor={editorElementId}
        className="mb-1.5 block text-sm font-medium text-[#456353]"
      >
        {label}
      </label>

      <div
        id={editorElementId}
        ref={hostRef}
        className="min-h-[260px] rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731]"
      />

      <p className="mt-2 text-xs text-[#6d8377]">
        Rich text editor powered by CKEditor.
      </p>
    </div>
  );
}
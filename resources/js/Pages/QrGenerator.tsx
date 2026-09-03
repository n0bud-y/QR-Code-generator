import { Head } from '@inertiajs/react';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';

type Variant = 'white' | 'transparent';

const QR_SIZE = 300;
const PLACEHOLDER = 'https://terminalgateway.net/dashboard';

export default function QrGenerator() {
    const [value, setValue] = useState('');
    const [variant, setVariant] = useState<Variant>('white');
    const [error, setError] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const text = value.trim() || PLACEHOLDER;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        QRCode.toCanvas(
            canvas,
            text,
            {
                width: QR_SIZE,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: variant === 'transparent' ? '#00000000' : '#FFFFFF',
                },
            },
            (err) => setError(err ? err.message : null),
        );
    }, [text, variant]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas || error) return;

        const link = document.createElement('a');
        link.download = `qrcode-${variant}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Head title="QR Code Generator" />

            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
                    <h1 className="text-lg font-bold text-gray-900">
                        QR Code Generator
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Paste a link, pick a background, download the PNG.
                    </p>

                    <label
                        htmlFor="qr-input"
                        className="mt-5 block text-sm font-medium text-gray-700"
                    >
                        URL or text
                    </label>
                    <input
                        id="qr-input"
                        type="text"
                        inputMode="url"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={PLACEHOLDER}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />

                    <fieldset className="mt-4">
                        <legend className="text-sm font-medium text-gray-700">
                            Background
                        </legend>
                        <div className="mt-2 flex gap-4 text-sm text-gray-700">
                            {(['white', 'transparent'] as const).map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-2 capitalize"
                                >
                                    <input
                                        type="radio"
                                        name="variant"
                                        value={option}
                                        checked={variant === option}
                                        onChange={() => setVariant(option)}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    {option === 'white' ? 'White' : 'Transparent'}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div
                        className="mt-5 flex justify-center rounded-lg p-4"
                        style={{
                            background:
                                variant === 'transparent'
                                    ? 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 20px 20px'
                                    : '#f3f4f6',
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            width={QR_SIZE}
                            height={QR_SIZE}
                            className="rounded"
                        />
                    </div>

                    {error && (
                        <p className="mt-3 text-sm text-red-600">
                            Could not generate a QR code: {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleDownload}
                        disabled={!!error}
                        className="mt-5 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Download PNG
                        {variant === 'transparent' ? ' (transparent)' : ''}
                    </button>
                </div>
            </div>
        </>
    );
}

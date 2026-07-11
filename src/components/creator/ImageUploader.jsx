"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";

export default function ImageUploader({ preview, onChange, loading = false }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Thumbnail Image
      </label>

      <label
        className="
          flex
          min-h-57.5
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-slate-700
          bg-slate-900/60
          transition-all
          hover:border-violet-500
          hover:bg-slate-900
        "
      >
        {preview ? (
          <div className="relative h-55 w-full overflow-hidden rounded-2xl">
            <Image src={preview} fill alt="Preview" className="object-cover" />
          </div>
        ) : (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
              <ImagePlus size={30} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              Upload Thumbnail
            </h3>

            <p className="mt-2 text-sm text-slate-400">PNG, JPG or WEBP</p>

            <p className="mt-1 text-xs text-slate-500">Maximum file size 2MB</p>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          disabled={loading}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

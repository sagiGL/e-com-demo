"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 850) return;
    if (!document.cookie.includes("welcome-toast=3")) {
      toast("✏️ Welcome to e-pen!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie += "welcome-toast=3;max-age=31536000";
        },
        description: (
          <>
            Your premium destination for pens, stationery, and writing
            instruments. Browse our curated collection.
            <hr className="my-2" />
            Fast, beautiful, and built with{" "}
            <a
              href="https://nextjs.org"
              className="font-semibold text-accent1 hover:underline"
              target="_blank"
            >
              Next.js
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}

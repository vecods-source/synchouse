"use client";

import type React from "react";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { SiTiktok, SiX } from "react-icons/si";

export function Footer() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:px-12">
        {/* Main footer content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Brand section - spans full width on mobile, 2 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png"
                alt="Synchouse"
                width={40}
                height={40}
                className="h-10 w-10 invert"
              />
              <span className="font-mono text-2xl font-bold">SYNCHOUSE</span>
            </div>
            <p className="mb-8 max-w-md text-base leading-relaxed text-background/80">
              Building enterprise-grade digital solutions that synchronize
              technology with your business vision.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/synchouse.qa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/synchouse_qa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@synchouse.qa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
                aria-label="TikTok"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services section */}
          <div>
            <h3 className="mb-6 font-mono text-sm font-bold tracking-wider">
              SERVICES
            </h3>
            <ul className="space-y-3 font-mono text-sm">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  ERP Systems
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  CRM Solutions
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  E-Commerce
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  AI Agents
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-sm font-bold tracking-wider">
              AGENCY
            </h3>
            <ul className="space-y-3 font-mono text-sm">
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleScroll(e, "#why-us")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, "#contact")}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t-4 border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
            <p className="font-mono text-sm text-background/60">
              © 2025 SYNCHOUSE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex flex-wrap justify-center gap-6 font-mono text-sm md:gap-8">
              <a
                href="https://www.privacypolicies.com/live/61b17a48-6e23-470d-b57b-4eea6c7e3e95"
                target="_blank"
                className="text-background/60 hover:text-background transition-colors"
              >
                PRIVACY
              </a>
              <a
                href="https://www.privacypolicies.com/live/61b17a48-6e23-470d-b57b-4eea6c7e3e95"
                target="_blank"
                className="text-background/60 hover:text-background transition-colors"
              >
                TERMS
              </a>
              <a
                href="https://www.privacypolicies.com/live/61b17a48-6e23-470d-b57b-4eea6c7e3e95"
                target="_blank"
                className="text-background/60 hover:text-background transition-colors"
              >
                COOKIES
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image"
import { Instagram } from "lucide-react"
import { SiTiktok, SiX } from "react-icons/si"

export function Footer() {
  return (
    <footer className="bg-foreground py-12 text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%287%29-s9g2TccXOz5oRKVDabl7LjfxxjMyCF.png"
                alt="Synchouse"
                width={40}
                height={40}
                className="h-10 w-10 invert"
              />
              <span className="font-mono text-2xl font-bold">SYNCHOUSE</span>
            </div>
            <p className="mb-6 max-w-md leading-relaxed text-background/80">
              Building enterprise-grade digital solutions that synchronize technology with your business vision.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-background bg-background text-foreground transition-colors hover:bg-background/90 pixel-corners"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold">SERVICES</h3>
            <ul className="space-y-2 font-mono text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  ERP Systems
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  CRM Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  E-Commerce
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  AI Agents
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-sm font-bold">COMPANY</h3>
            <ul className="space-y-2 font-mono text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t-4 border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-mono text-sm text-background/60">© 2025 SYNCHOUSE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 font-mono text-sm text-background/60">
              <a href="#" className="hover:text-background transition-colors">
                PRIVACY
              </a>
              <a href="#" className="hover:text-background transition-colors">
                TERMS
              </a>
              <a href="#" className="hover:text-background transition-colors">
                COOKIES
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

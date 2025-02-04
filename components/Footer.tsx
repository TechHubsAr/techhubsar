import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted mt-auto w-full">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold">About TechHubsAr</h3>
            <p className="text-sm text-muted-foreground">
              TechHubsAr is a community-driven project showcasing tech
              communities across Argentina.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold">Important Links</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/add-community"
                  className="text-sm text-primary hover:underline inline-block"
                >
                  Add New Community
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-primary hover:underline inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-primary hover:underline inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold">Connect</h3>
            <a
              href="https://github.com/TechHubsAr/techhubsar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:underline"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub Repository
            </a>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TechHubsAr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

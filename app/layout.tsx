import './globals.css';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Index from '../app/page'
import Signin from '../app/signin/page'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'DivvyAI',
  description: 'This is our Big Red Hacks 2024 Project'
};

const { userId } = auth();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>
            {/* {children} */}
            <SignedIn>
              <Index userId={userId!} />
            </SignedIn>
            <SignedOut>
              <Signin />
            </SignedOut>

          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

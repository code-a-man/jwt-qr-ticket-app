import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={74}
            radius="sm"
            src="/qr-logo.png"
            width={74}
          />
          <div className="flex flex-col">
            <p className="text-md">JWT QR Code Ticket Verifier</p>
            <p className="text-small text-default-500">Made with ❤️ by <Link className="text-sm" href="https://github.com/code-a-man">Code a Man</Link></p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Generate tickets using hs512 jwt and scan on event start to get started follow the page:</p>
          <Link href="/qr-read?token=your-secret-sha512-key">Ticket Reading Page</Link>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/code-a-man/jwt-qr-ticket-app"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { QrScanner } from '@yudiel/react-qr-scanner';
import jwt from 'jsonwebtoken';
import { Card, CardBody, CardFooter, Input, Textarea, Link } from "@nextui-org/react";


const QrReadPage = () => {
	const searchParams = useSearchParams();
	const [token, setToken] = useState(searchParams.get('token'));
	const [domLoaded, setDomLoaded] = useState(false);
	const [result, setResult] = useState("");
	const [jwtToken, setJwtToken] = useState("");
	const [isSuccess, setIsSuccess] = useState(true);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	const verifyJwtToken = (decodedToken: string) => {
		try {
			jwt.verify(decodedToken, token as string, function (err, decoded) {
				if (err) {
					setResult(JSON.stringify(err));
					setIsSuccess(false);
				} else {
					setResult(JSON.stringify(decoded, null, 2));
					setIsSuccess(true);
				}
			});
		} catch (error) {
			console.error("Error: ", error);
			setIsSuccess(false);
		}
	};

	const parseResult = (result: string) => {
		try {
			const parsed = JSON.parse(result);
			if (parsed.errorMessage) {
				return parsed.errorMessage;
			} else {
				return JSON.stringify(parsed, null, 2);
			}
		} catch (error) {
			return result;
		}
	}

	const handleQrDecode = (decodedToken: string) => {
		setJwtToken(decodedToken);
		console.log("handle");
		verifyJwtToken(decodedToken);
	};
	const validateToken = (t: string) => t.match(/^[a-f0-9]{128}$/i);
	const isTokenInvalid = React.useMemo(() => {
		if (token === "") return false;
		return validateToken(token || "") ? false : true;
	}, [token]);

	return (
		<main>
			<div className="min-h-screen flex flex-col items-center justify-center">
				<Card shadow="lg" radius="lg" className='h-auto'>
					<CardBody className="overflow-visible p-0">
						{domLoaded && (
							<QrScanner
								containerStyle={{ minHeight: "360x", minWidth: "360px" }}
								onDecode={handleQrDecode}
								onError={(error) => console.log(error?.message)}
								constraints={{ facingMode: "environment", aspectRatio: { min: 1, max: 1 } }}
							/>
						)}
					</CardBody>
					<CardFooter className="text-small flex flex-col">
						<Input

							type="text"
							label="Secret Key"
							variant="flat"
							formNoValidate={true}
							color="success"
							isInvalid={isTokenInvalid}
							errorMessage={isTokenInvalid && `Token must be a valid sha512 hash.`}
							defaultValue={token || ""}
							className="max-w-xs text-medium"
							onValueChange={(value) => {
								setResult("");
								setIsSuccess(false);
								setToken(value);
								verifyJwtToken(value);
							}}
						/>
						<Textarea
							isReadOnly
							isInvalid={!isSuccess}
							variant="flat"
							color={isSuccess ? "success" : "primary"}
							label="QR Code Content"
							defaultValue={parseResult(result)}
							className="max-w-xs mt-2 text-medium"
						/>
						<p className="text-sm"> Made with ❤️ by <Link className="text-sm" href="https://github.com/code-a-man">Code a Man</Link></p>
					</CardFooter>
				</Card>
			</div>
		</main>
	);
};

export default QrReadPage;

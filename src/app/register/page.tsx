import { RegistrationForm } from '@/components/form/RegistrationForm';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function FormPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center text-center gap-3 mb-4">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center text-sm">
                  D
                </div>
                <span className="font-semibold text-slate-900 text-lg">Dealers Auto Center</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 text-center">Create an Account</h1>
            <p className="text-sm text-slate-500 text-center">Join the Dealers Auto Center platform</p>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <RegistrationForm />
          </CardContent>

          <CardFooter className="justify-center pb-6">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

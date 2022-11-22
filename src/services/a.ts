// import { TOKEN_KEY } from "@/lib/helpers/consts";
// import { authService } from "@/lib/services/auth";
// import jwtDecode from "jwt-decode";
// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { setCookie } from "nookies";

// type NextAuthOptionsCallback = (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => NextAuthOptions;

// export const authOptions: NextAuthOptionsCallback = (req, res) => {
//   return {
//     providers: [
//       CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           email: { label: "Email", type: "text", placeholder: "email" },
//           password: { label: "Password", type: "password" },
//         },
//         async authorize(credentials) {
//           const payload = {
//             email: credentials?.email,
//             password: credentials?.password,
//           };

//           try {
//             const { data } = await authService.login(
//               payload?.email as string,
//               payload?.password as string
//             );

//             const decodedToken = jwtDecode((data as any).accessToken) as any;

//             console.log(decodedToken);

//             setCookie({ res }, TOKEN_KEY, (data as any).accessToken, {
//               expires: new Date((decodedToken.exp as number) * 1000),
//               path: "/",
//             });

//             return {
//               ...(data as any),
//             };
//           } catch (error: any) {
//             throw {
//               message: error.code,
//             };
//           }
//         },
//       }),
//     ],
//     secret: process.env.JWT_SECRET,
//     pages: {
//       signIn: "/login",
//     },
//     callbacks: {
//       async jwt(data) {
//         if (data.account && data.user) {
//           return {
//             ...data.token,
//             roles: (data.user as any).roles,
//             accessToken: (data.user as any).accessToken,
//           };
//         }

//         return data.token;
//       },
//       async session({ session, token, user }) {
//         session.user.accessToken = token.accessToken as string;
//         session.user.roles = token.roles as string[];

//         return session;
//       },
//       redirect({ url, baseUrl }) {
//         return baseUrl;
//       },
//     },
//     debug: true,
//   };
// };

// // export default NextAuth(authOptions);

// // eslint-disable-next-line import/no-anonymous-default-export
// export default (req: NextApiRequest, res: NextApiResponse) => {
//   return NextAuth(req, res, authOptions(req, res));
// };

export default function test() {
  return null;
}

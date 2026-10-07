import { redirect } from "next/navigation";

// The journal is not published yet, so send visitors to the work archive.
export default function Blog() {
  redirect("/works");
}

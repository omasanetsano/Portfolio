import Image from "next/image";

const icons:Record<string,string>={
  React:"react",TypeScript:"typescript",JavaScript:"javascript",Python:"python",Rust:"rust","Next.js":"nextdotjs",Supabase:"supabase",PostgreSQL:"postgresql",Vite:"vite",Vercel:"vercel",Docker:"docker","Tailwind CSS":"tailwindcss",OpenAI:"openai",Gemini:"google",FastAPI:"fastapi",MongoDB:"mongodb","Git/GitHub":"github"
};
export function TechBadge({name}:{name:string}){const icon=icons[name];return <span className="tech-badge">{icon?<Image src={`/brands/${icon}.svg`} width={15} height={15} alt="" aria-hidden/>:<i>{name.slice(0,2).toUpperCase()}</i>}<b>{name}</b></span>}
export function SocialMark({name}:{name:"github"|"linkedin"}){return <Image className="social-mark" src={`/brands/${name}.svg`} width={15} height={15} alt="" aria-hidden/>}


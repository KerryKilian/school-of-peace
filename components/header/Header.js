import { useRouter } from "next/router";
import Image from "next/image";
import classes from "./header.module.css";
import Link from "next/link";

/**
 * Header for the whole website
 * @returns
 */
export default function Header() {
  const router = useRouter();
  function showAddHandler() {
    router.push("/add");
  }
  function showHomepageHandler() {
    router.push("/");
  }
  function showEditHandler() {
    router.push("/edit");
  }
  return (
    <div>
      <div className={`${classes.header}`}>
        <div className={`${classes.logo}`}>
          <Image
            src="/logo.png"
            alt="Logo of Sant Egidio"
            width={80}
            height={50}
          />
        </div>
        <div className={`${classes.sectionGroup}`}>
          <Link className={`${classes.section}`} href="/">
            <button className={`${classes.section}`}>Suchen</button>
          </Link>
          <Link className={`${classes.section}`} href="/add">
            <button className={`${classes.section}`}>Hinzufügen</button>
          </Link>
          <Link className={`${classes.section}`} href="/plan">
            <button className={`${classes.section}`}>Planen</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

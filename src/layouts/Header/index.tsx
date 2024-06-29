import styles from "./Header.module.css";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import SearchAndSwitcher from "@/components/SearchAndSwitcher";

const Header = () => {
  return (
    <header className={styles.header_wrapper}>
      <ul className={styles.nav_wrapper}>
        <Link href="/" className={styles.nav_element}>
          Артыкулы
        </Link>
        <Link href="/about" className={`${styles.logo} ${styles.nav_element}`}>
          <Image src={logo} width={100} height={100} alt="logo" />
          <p className={styles.nav_element_p}>Пра нас</p>
        </Link>
        <Link href="/library" className={styles.nav_element}>
          Палічка
        </Link>
      </ul>
      <SearchAndSwitcher />
    </header>
  );
};

export default Header;

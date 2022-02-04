import { styled } from "@stitches/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserAvatar } from "components/UserAvatar";
import { ThemeToggle } from "components/ThemeToggle";

const Flex = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
const HeaderContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#24292f",
  padding: "16px 32px 16px 16px",
});

const Logo = styled("div", {
  color: "white",
});
const Text = styled("div", {
  color: "white",
  marginRight: "10px",
});

const Header = () => {
  const { data: session } = useSession();

  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <Logo>Twilight Struggle Competition Hub</Logo>
      </Link>
      <ThemeToggle />
      {!session && (
        <Link href="/login" passHref>
          <Text>Sign In</Text>
        </Link>
      )}
      {session && (
        <Flex>
          <Link href="/userprofile" passHref>
            <Text>{`Hi ${session?.user?.name}`}</Text>
          </Link>
          <UserAvatar name={session?.user?.name} />
        </Flex>
      )}
    </HeaderContainer>
  );
};

export default Header;

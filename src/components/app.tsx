"use client";

import { Fragment, useRef, useState, forwardRef, HTMLAttributes } from "react";
import Image from "next/image";
import { motion, useAnimation, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import * as Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { MdOutlineEmail } from "react-icons/md";
import { Slot } from "@radix-ui/react-slot";
import {
  NavigationListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Dialog } from "@/components/ui/dialog";
import { footerVariants } from "@/config/animation";
// import { useSite } from "@/hooks/useSite";
import { Logo } from "./logo";
import { VariantProps, cva } from "class-variance-authority";
import { useDimensions } from "@/hooks/use-dimension";
import { useApp } from "@/hooks/use-app";
import { DesktopNavigation } from "./desktop-navigation";
import { ContactFormDialog } from "./contact-form-dialog";

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className }, ref) => {
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { height } = useDimensions(containerRef);
  const { isMenuOpen, toggleMenu } = useApp();
  const { scrollY } = useScroll();

  const scrollYRange = [0, 100, 100];

  const logoSizeHeight = useTransform(scrollY, scrollYRange, ["60px", "56px", "56px"]);
  const logoSizeWidth = useTransform(scrollY, scrollYRange, ["220px", "174px", "174px"]);
  const paddingHeaderX = useTransform(scrollY, scrollYRange, ["30px", "20px", "20px"]);
  const paddingHeaderY = useTransform(scrollY, scrollYRange, ["1.2rem", "1rem", "1rem"]);

  const controls = useAnimation();
  const delta = useRef(0);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (val) => {
    const diff = Math.abs(val - lastScrollY.current);

    if (val >= lastScrollY.current) {
      delta.current = delta.current >= 10 ? 10 : delta.current + diff;
    } else {
      delta.current = delta.current <= -10 ? -10 : delta.current - diff;
    }

    if (delta.current >= 10 && val > 200) {
      controls.start("hidden");
    } else if (delta.current <= -10 || val < 200) {
      controls.start("visible");
    }

    lastScrollY.current = val;
    setCurrentScrollY(val);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-[100] w-full backdrop-blur-md transition-colors duration-500 bg-transparent h-20",
        {
          "bg-white/90 backdrop-blur-3xl shadow-2xl": currentScrollY > 80,
          "backdrop-blur-none": currentScrollY < 80,
        },
        className
      )}
      ref={ref}
      {...(isMenuOpen && { "data-menu-open": true })}
    >
      <Navbar.Root
        sticky
        initial="visible"
        animate={controls}
        variants={{
          visible: { top: "0px" },
          hidden: { top: "0px" },
        }}
        style={{
          paddingLeft: paddingHeaderX,
          paddingRight: paddingHeaderX,
          paddingTop: paddingHeaderY,
          paddingBottom: paddingHeaderY,
        }}
      >
        <Fragment>
          <Navbar.Brand className={cn({ hidden: isMenuOpen })}>
            <Logo height={logoSizeHeight} width={logoSizeWidth} />
          </Navbar.Brand>
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className="flex"
          >
            {/* {!isSiteConfigLoading && ( */}
            <Fragment>
              <DesktopNavigation />
              {/* <Drawer open={isMenuOpen} onClose={() => toggleMenu(0)}>
                    <DrawerTrigger
                      asChild
                      className={cn({
                        hidden: isMenuOpen,
                      })}
                    >
                      <Navbar.Toggle />
                    </DrawerTrigger>
                    <VisuallyHidden.Root>
                      <DrawerTitle>Menu</DrawerTitle>
                    </VisuallyHidden.Root>
                    <DrawerContent className="container max-w-xl md:max-w-4xl h-[99svh]">
                      <div className="flex justify-between">
                        <Navbar.Brand className="mt-5">
                          <Logo height={logoSizeHeight} width={logoSizeWidth} />
                        </Navbar.Brand>
                        <DrawerTrigger asChild>
                          <Navbar.Toggle className="mt-5 bg-secondary text-muted" />
                        </DrawerTrigger>
                      </div>
                      <MobileNavigation
                        navigation={siteConfigData?.primaryNavigation}
                        servicesData={serviceData}
                        isServicesLoading={isLoading}
                      />
                    </DrawerContent>
                  </Drawer> */}
            </Fragment>
            {/* )} */}
          </motion.div>
        </Fragment>
      </Navbar.Root>
    </motion.header>
  );
});
Header.displayName = "Header";

type ContentProps = HTMLAttributes<HTMLDivElement>;

const Content = ({ className, children }: ContentProps) => {
  const { isContactDialogOpen } = useApp();

  return (
    <motion.main
      className={cn(
        "mt-28 container relative h-full flex items-center flex-col justify-center space-x-2",
        className
      )}
    >
      {children}
      <Dialog open={isContactDialogOpen}>{isContactDialogOpen && <ContactFormDialog />}</Dialog>
    </motion.main>
  );
};
Content.displayName = "Content";

const Footer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((_, ref) => {
  const { setIsContactDialogOpen } = useApp();
  const MotionButton = motion(Button);

  return (
    <motion.footer
      className="flex flex-col w-full select-none items-center p-5 relative mt-24 border border-t-primary-foreground shadow"
      initial="hide"
      whileInView="show"
      exit="hide"
      variants={footerVariants}
      ref={ref}
    >
      <div className="fixed bottom-4 right-10 z-50 flex flex-row items-center gap-4">
        <MotionButton
          aria-label="Entre em contato"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
          variant="icon"
          size="2xl"
          icon
          rounded="full"
          className="flex items-center justify-center gap-2 shadow"
          onClick={() => setIsContactDialogOpen(true)}
        >
          <MdOutlineEmail size={32} />
          <span className="sr-only">Entre em contato</span>
        </MotionButton>
      </div>
      <div className="container flex flex-row gap-4 items-center justify-center w-full">
        <div className="flex flex-row justify-center items-center gap-4">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width="60"
            height="60"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <p className="text-center text-primary-foreground text-opacity-75">
            © {new Date().getFullYear()} - Todos os direitos reservados
          </p>
        </div>
      </div>
    </motion.footer>
  );
});
Footer.displayName = "Footer";

const titleVariants = cva("font-oswald font-bold", {
  variants: {
    variant: {
      default: "text-primary-foreground ",
      secondary: "text-secondary-foreground",
    },
    size: {
      default: "text-xl md:text-6xl",
      sm: "text-sm md:text-lg",
      lg: "text-lg md:text-2xl",
      xl: "text-xl md:text-6xl",
      "2xl": "text-2xl md:text-8xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  asChild?: boolean;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, children, asChild, variant, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "h1";

    return (
      <Comp className={cn(titleVariants({ variant, size, className }))} {...props} ref={ref}>
        {children}
      </Comp>
    );
  }
);
Title.displayName = "Title";

const Subtitle = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";

    return (
      <Comp
        className={cn(
          "ms-7 text-xl md:text-2xl font-oswald font-semibold text-primary-foreground text-wrap",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
Subtitle.displayName = "Subtitle";

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  background?: string;
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, background, children, ...props }, ref) => {
    return (
      <div
        className={cn("w-full flex flex-col justify-center items-center font-oswald", className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
PageHeader.displayName = "PageHeader";

export { Header, Content, Footer, Title, Subtitle, PageHeader };

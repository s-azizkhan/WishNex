import ThemeProvider from "@/Components/ThemeProvider"
import { Toaster } from "@/Components/ui/toaster"

export default function Main({ children }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
            <Toaster />
        </ThemeProvider>
    )
};

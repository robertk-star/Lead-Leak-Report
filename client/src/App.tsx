import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ContentPage from "./components/ContentPage";
import Home from "./pages/Home";
import IndustryLanding from "./pages/IndustryLanding";
import Preview from "./pages/Preview";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/preview" component={Preview} />
      <Route path="/how-it-works">{() => <ContentPage kind="how-it-works" />}</Route>
      <Route path="/ai-visibility">{() => <ContentPage kind="ai-visibility" />}</Route>
      <Route path="/sample-report">{() => <ContentPage kind="sample-report" />}</Route>
      <Route path="/pricing">{() => <ContentPage kind="pricing" />}</Route>
      <Route path="/faq">{() => <ContentPage kind="faq" />}</Route>
      <Route path="/404" component={NotFound} />
      <Route path="/:slug" component={IndustryLanding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

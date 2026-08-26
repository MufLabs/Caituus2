import { Component, type ErrorInfo, type ReactNode } from "react";
import { LeafIcon } from "./icons";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error de renderizado en Caituus:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-moss-900 p-6">
          <div className="w-full max-w-lg rounded-lg border border-clay-500/50 bg-moss-850 p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-clay-500/15 text-clay-400">
              <LeafIcon className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-semibold text-cream-100">
              Algo salió mal al cargar la página
            </h1>
            <p className="mt-2 text-sm text-cream-200">
              Ocurrió un error inesperado. Recarga la vista previa (Ctrl + Shift + R). Si persiste,
              comparte este mensaje:
            </p>
            <code className="mt-4 block max-h-32 overflow-auto rounded-md border border-moss-700 bg-moss-900 p-3 text-left font-mono text-[11px] leading-relaxed break-words text-clay-300">
              {this.state.error.message}
            </code>
            <button
              onClick={() => {
                this.setState({ error: null });
                window.location.reload();
              }}
              className="btn-press mt-6 rounded-full bg-leaf-600 px-6 py-3 text-sm font-bold text-moss-900 hover:bg-leaf-500"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

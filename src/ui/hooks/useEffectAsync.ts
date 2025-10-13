import React, { useEffect } from "react";

type AsyncEffect = (signal: AbortSignal) => Promise<void | (() => void)> | void;
export function useEffectAsync(
    effect: AsyncEffect,
    deps: React.DependencyList = []
): void {
    useEffect(() => {
        const abortController = new AbortController();

        const cleanupPromise = effect(abortController.signal);

        return () => {
            abortController.abort();

            if (cleanupPromise instanceof Promise) {
                cleanupPromise.then((cleanup) => cleanup && cleanup());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

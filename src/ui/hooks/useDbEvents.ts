import { useEffect, useRef, useState } from "react";

export function useDbEvents(id: string) {
  const [_, setEvent] = useState<Event | undefined>(undefined);
  const ref = useRef(document.createElement("div"));

  useEffect(() => {
    ref.current.addEventListener("upsert", (event) => {
      setEvent(event);
      console.log(id);
    });
  }, []);
}

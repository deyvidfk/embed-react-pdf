import { useContext } from "react";
import { ControlsContext } from "./Provider";

export const useControls = () => {
    const ctx = useContext(ControlsContext)

    if (!ctx) {
        throw new Error(
            "Você está tentando usar o React.useContext(ControlsContext), mas o contexto é nulo. Isso pode acontecer se você não envolver o seu componente em um provedor de contexto ou se o provedor de contexto não tiver um valor inicial."
        );
    }
    return ctx

}
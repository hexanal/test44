import { Grid } from "@react-three/drei";

export function GridHelper(props) {
    // TODO
    return (
        <Grid
            position={[0, 0.05, 0]}
            fadeDistance={50}
            fadeStrength={0.5}
            infiniteGrid />
    );
}

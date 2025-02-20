import { Grid } from "@react-three/drei";

export function GridHelper(props) {
    return (
        <Grid
            position={[0, 0, 0]}
            fadeDistance={12}
            fadeStrength={0.8}
            infiniteGrid
        />
    );
}

import Scanner from '@/components/Scanner';

function Bleh(props) {
    return (
        <Scanner
            label={`LABEL`}
            use={props}
            history={16}
            linecolor={`rgba(20 20 255 / 1)`}
            withValue
        />
    );
}

export default Bleh;
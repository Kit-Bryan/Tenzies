export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
    };

    return (
        <div className="die-div" onClick={props.holdDice} style={styles}>
            {props.number}
        </div>
    );
}

const Grid = (props: any) => {
    const { shapes } = props; 
    return (
        <div className="grid-parent">
            {shapes.map((shape: any) => (
                <div key={shapes.indexOf(shape)} className="shape-parent">
                    <div className={`${shape.name} shape`} style={{backgroundColor: shape.color}}></div>
                </div>
              ))}
        </div>
    )
}

export default Grid;
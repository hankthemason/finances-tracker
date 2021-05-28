interface LegendProps {
  data: any
}

export const Legend = (props: LegendProps) => {
  console.log(props)

  return (
    props.data
  )
}
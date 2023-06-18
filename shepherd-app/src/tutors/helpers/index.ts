export const filterClass = ({...classes}: any) => {
  return classes.filter(Boolean).join(' ')
}
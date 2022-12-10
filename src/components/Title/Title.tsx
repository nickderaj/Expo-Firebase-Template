import { Text } from 'react-native'
import { styles } from './Title.styles'

type Props = { children: React.ReactNode }
const Title: React.FC<Props> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>
}

export default Title

import { Text } from 'react-native'
import { styles } from './Title.styles'

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>
}

export default Title

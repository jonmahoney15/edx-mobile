import { View, Platform } from "react-native"
import { Text } from "../../components"

interface DateItemProps {
    title: string
    description?: string
    dueDate?: string
  }   

export const DateItem = (dateProps: DateItemProps) => {
    return (
      <View>
          <Text style={{ marginBottom: Platform.OS === "android" ? -8 : -4 }}>
            <Text weight="bold" style={{ fontSize:14, lineHeight: Platform.OS === "android" ? 20 : 16 }}>
              {dateProps.title}
            </Text>
            {dateProps.description !== undefined && 
              <Text style={{fontSize:14,}}>
                : {dateProps.description}
              </Text>
            }
          </Text>
          {dateProps.dueDate !== undefined && 
            <Text style={{ fontSize: 14 }}>
              {dateProps.dueDate}
            </Text>
          }
      </View> 
    )
  }

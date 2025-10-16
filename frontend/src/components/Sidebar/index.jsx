import React, { useContext } from "react";
import {Stack, Drawer, CloseButton, Portal, For, VStack, Spinner} from "@chakra-ui/react";
import { SearchContext } from "../../context/SearchContext";
import { LuBox } from "react-icons/lu";
import PlaceCard from "../PlaceCard";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const {places, isLoading, error, searchType, sidebarOpen, setSidebarOpen } = useContext(SearchContext);
  
  return (
    <Drawer.Root placement="start" 
                closeOnInteractOutside={false} 
                trapFocus={false} 
                modal={true}
                open={sidebarOpen}
                onOpenChange={(e) => setSidebarOpen(e.open)}>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content className={styles.sidebarContainer}>
            <Drawer.Header className={styles.sidebarHeader}>
              <Drawer.Title fontWeight="light" className="text-responsive">{searchType !== "" ? `${searchType} places in the selected area` : `Some error ocurred: ${error}`}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className={styles.sidebarBody}>
              {
                isLoading ? <Spinner size="md" left="50%" top="50%" position="relative" transform="translate(-50%,-50%)"/> :
                <Stack>
                  <For each={places}
                    fallback={
                        <VStack textAlign="center" fontWeight="medium">
                          <LuBox />
                          <p>
                            {error ? String(error) : "No items to show"}
                          </p>
                        </VStack>
                      }
                    >
                      {
                        (item, index) => (
                          <PlaceCard key={index} name={item.name}
                            coordinates={{latitude: item.latitude, longitude: item.longitude}}/>
                        )
                      }
                  </For>
                </Stack>
              }
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

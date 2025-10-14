import React, { useState, useContext, useEffect, useRef } from "react";
import {Stack, Drawer, CloseButton, Portal, For, VStack} from "@chakra-ui/react";
import { SearchContext } from "../../context/SearchContext";
import { LuBox } from "react-icons/lu";
import PlaceCard from "../PlaceCard";
import styles from "./Sidebar.module.css";

export default function Sidebar(props) {
  const {open, setSidebarOpen} = props;
  const {places, isLoading, error, searchType } = useContext(SearchContext);
  const prevPlacesRef = useRef();

  useEffect(() => {
    if (prevPlacesRef.current !== undefined && prevPlacesRef.current !== places){
      setSidebarOpen(true);
    }
    prevPlacesRef.current = places;
  }, [places])
  
  return (
    <Drawer.Root placement="start" 
                closeOnInteractOutside={false} 
                trapFocus={false} 
                modal={true}
                open={open}
                onOpenChange={(e) => setSidebarOpen(e.open)}>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content className={styles.sidebarContainer}>
            <Drawer.Header className={styles.sidebarHeader}>
              <Drawer.Title fontWeight="light" className="text-responsive">{searchType !== "" ? `${searchType} places in the selected area` : `Some error ocurred: ${error}`}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className={styles.sidebarBody}>
              <Stack>
                <For each={places}
                  fallback={
                      <VStack textAlign="center" fontWeight="medium">
                        <LuBox />
                        No items to show
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

import React, { useState } from "react";
import {Button, Drawer, CloseButton, Portal} from "@chakra-ui/react";

export default function Sidebar(props) {
  const {open, setSidebarOpen} = props;
  
  return (
    <Drawer.Root placement="start" 
                closeOnInteractOutside={false} 
                trapFocus={false} 
                modal={true}
                open={open}
                onOpenChange={(e) => setSidebarOpen(e.open)}>
      {/* <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </Drawer.Trigger> */}
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

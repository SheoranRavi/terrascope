import React, { useContext, useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { SearchContext } from "../../context/SearchContext";

export default function Sidebar(){
  const {places, isLoading, searchType} = useContext(SearchContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // setOpen when places changes
    setOpen(true);
  }, [places])
  
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="sidebar-container">
      <Collapsible.Trigger>
        {open ? "close" : "open"}
      </Collapsible.Trigger>
      <Collapsible.Content className="sidebar">
        <p>A list of places</p>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
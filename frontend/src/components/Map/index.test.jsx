import {render, screen} from '@testing-library/react'
import { test, expect } from 'vitest'
import React from 'react'
import Map from './index'

test('renders MapContainer', () => {
  render(<Map />)
  const mapElement = document.querySelector('.leaflet-container')
  expect(mapElement).toBeInTheDocument()
})

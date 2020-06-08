mod utils;
extern crate js_sys;
extern crate fixedbitset;
extern crate web_sys;

// macro_rules! log {
//     ( $( $t:tt )*) => {
//         web_sys::console::log_1(&format!( $( $t )* ).into());
//     };
// }

use wasm_bindgen::prelude::*;
use fixedbitset::FixedBitSet;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(s: &str) {
    alert(s);
}

// A single cell 
// Dead and alive are their respective values
// so that they can be added to determine neighbors easily
#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: FixedBitSet,
}

// impl Cell {
//     fn toggle(&mut self) {
//         *self = match *self {
//             Cell::Dead => Cell::Alive,
//             Cell::Alive => Cell:Dead,
//         }
//     }
// }

#[wasm_bindgen]
impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    // Counts the number of living neighbors for each cell
    fn neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let index = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[index] as u8;
            }
        }
        count
    }
}

#[wasm_bindgen]
impl Universe {
    // Determine the next phase of life
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let index = self.get_index(row, col);
                let cell = self.cells[index];
                let neighbors = self.neighbor_count(row, col);

                // let next_cell = match(cell, neighbors) {
                //     // Less than 2 neighbors cell dies
                //     (Cell::Alive, x) if x < 2 => Cell::Dead,
                //     // 2-3 neighbors cell lives
                //     (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                //     // More than 3 neighbors cell dies
                //     (Cell::Alive, x) if x > 3 => Cell::Dead,
                //     // 3 neighbors spawns new living cell
                //     (Cell::Dead, 3) => Cell::Alive,

                //     (otherwise, _) => otherwise,
                // };

                // next[index] = next_cell;

                next.set(index, match (cell, neighbors) {
                    (true, x) if x < 2 => false,
                    (true, 2) | (true, 3) => true,
                    (true, x) if x > 3 => false,
                    (false, 3) => true,
                    (otherwise, _) => otherwise
                });
            }
        }
        self.cells = next;
    }

    // Create a new universe
    pub fn new(start: u32, width: u32, height: u32) -> Universe {

        // let cells = (0..width * height).map(|_| {
        //     if js_sys::Math::random() > 0.5 {
        //         Cell::Alive
        //     } else {
        //         Cell::Dead
        //     }
        // }).collect();

        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        if start == 0 {
            for i in 0..size {
                cells.set(i, js_sys::Math::random() > 0.5)
                // cells.set(i, i % 2 == 0 || i % 7 == 0)
            }
        }
        

        let mut universe = Universe {
            width,
            height,
            cells,
        };

        match start {
            1 => universe.set_cells(&[(1,2), (2,3), (3,1), (3,2), (3,3)]),
            2 => universe.set_cells(&[
                // left square
                (5, 1), (5, 2), (6, 1), (6, 2),
                // left crescent
                (5, 11), (6, 11), (7, 11), (4, 12), (8, 12), (3, 13), (9, 13), (3, 14), (9, 14),
                // // left crescent addition
                (6, 15), (4, 16), (8, 16), (5, 17), (6, 17), (7, 17), (6, 18),
                // // right collision
                (3, 21), (4, 21), (5, 21), (3, 22), (4, 22), (5, 22), (2, 23), (6, 23),
                (1, 25), (2, 25), (6, 25), (7, 25),
                // // right square
                (3, 35), (4, 35), (3, 36), (4, 36)
                ]),
            _ => ()
        };

        universe
    }

    // pub fn render(&self) -> String {
    //     self.to_string()
    // }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    // Setting dimensions resets the Universe to dead
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        let size = (self.width * self.height) as usize;
        self.cells = FixedBitSet::with_capacity(size);
        for i in 0..size {
            // cells.set(i, js_sys::Math::random() > 0.5)
            self.cells.set(i, false)
        }
    }
    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        let size = (self.width * self.height) as usize;
        self.cells = FixedBitSet::with_capacity(size);
        for i in 0..size {
            // cells.set(i, js_sys::Math::random() > 0.5)
            self.cells.set(i, false)
        }
    }

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let index = self.get_index(row, column);
        self.cells.set(index, self.cells[index] ^ true);
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }
}

impl Universe {
    pub fn get_cells(&self) -> &fixedbitset::FixedBitSet {
        &self.cells 
    }
    
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let index = self.get_index(row, col);
            self.cells.set(index, true);
        }
    }
}

// use std::fmt;
// impl fmt::Display for Universe {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         for line in self.cells.as_slice().chunks(self.width as usize) {
//             for &cell in line {
//                 let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
//                 write!(f, "{}", symbol)?;
//             }
//             write!(f, "\n")?;
//         }
//         Ok(())
//     }
// }
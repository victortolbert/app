---
title: Coca-Cola UI Exercise
---

A Freestyle dispenser works similar to an inkjet printer, but instead of ink cartridges a dispenser
contains ingredient cartridges. Our larger dispensers can hold up to 36 ingredient cartridges.

The cartridges have RFID tags which we use to identify the available ingredients as well as
identify which slot the cartridge is in, and therefore which pump to use to pump that ingredient.

However, one model of dispenser has a hardware limitation. **While we can identify all the
ingredients in a shelf, we can’t tell which slot the cartridges are in**. For this one model of
dispenser there is an extra setup step where **the technician needs to assign each of the
cartridges to a slot**.

To keep this exercise simple, assume this dispenser has a single shelf that has eight slots labeled S1..S8.
Let’s also assume that there is an endpoint that returns the ingredients available in the shelf and that this
endpoint returns the following data:

## Slots for a single shelf dispenser (8)

```json
[
 {"id":100,"name":"Coke Part 1"},
   {"id":101,"name":"Coke Part 2"},
   {"id":102,"name":"Diet Coke Part 1"},
   {"id":103,"name":"Diet Coke Part 2"},
   {"id":104,"name":"Fanta"},
   {"id":105,"name":"Sprite"},
   {"id":106,"name":"Powerade"},
   {"id":107,"name":"Lemon"}
]
```

Furthermore, assume there is an endpoint that can add a mapping of an ingredient to a slot:

POST /api/mappings/${slot}/${ingredientId}

and another to remove a mapping:

DELETE /api/mappings/${slot}

Frontend Developer

coding assessment
The above calls can be mocked however you like …Keep it simple.

This is not the focus of this exercise.

The goal of this exercise is to write a simple ui that shows the unmapped ingredients and
allows them to be mapped to an available slot.

Assume that initial state on startup is that all slots are unmapped
and that the available ingredients are the array list above.

Example UI:

## UI Requirements:

• The column on the left displays all ingredients that are not currently assigned to a slot.
• The column on the right displays the list of slots.
• The selected ingredient is indicated by a ring around the icon and can be assigned to a slot by selecting the “assign” button for the slot.
• Once an ingredient is assigned to a slot it is removed from the list.
• Each slot should contain the name of the slot (S1, S2, etc).
• If a slot does not have an ingredient assigned, it should show "unassigned".
• If a slot has an ingredient assigned, it should show the ingredient name.
• If a slot has an ingredient assigned it should show an “X” button.  Clicking the button will remove the assignment. The slot will then appear as unassigned and the ingredient will
be return to the ingredient list in the left column.

## Recommended stack:

- ReactJS
- Typescript
- SASS

The above recommendations are based on the technologies currently in used by the
Freestyle UI Team.

Scaffolding (create-react-app, etc) and final stack are up to you.

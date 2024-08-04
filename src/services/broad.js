import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import { Item } from "../models/item";
import { Column } from "../models/column";
import { Broad } from "../models/broad";

export const index = async () => {
  const broads = await Broad.find();
  
  return broads;
};

export const create = async ({ title, background }) => {
  const newBroad = {
    title: title,
    background: background,
    columns: []
  }
  const broad = new Broad(newBroad);
  await broad.save();

  return broad;
}

export const show = async ({ id }) => {
  const broad = await Broad.findById(id)
    .populate([{
      path: "columns",
      populate: {
        path: "tasks",
      },
    }]);

  if (!broad) {
    throw new ApiError(httpStatus.NOT_FOUND, "Broad not found");
  }

  return broad;
}

export const update = async ({ id, title, background }) => {
  const newBroad = {
    title: title,
    background: background,
  }   

  const broad = await Broad.findByIdAndUpdate(id, newBroad, { new: true });

  if (!broad) {
    throw new ApiError(httpStatus.NOT_FOUND, "Broad not found");
  }

  return broad;
}

export const updatePosition = async ({ id, type, source, destination }) => {
  const broad = await Broad.findById(id);

  if (!broad) {
    throw new ApiError(httpStatus.NOT_FOUND, "Broad not found");
  }

  if (type === "COLUMN") {
    const sourceColumn = await Column.findOne({
      broad: id,
      index: source.index,
    })
    const destinationColumn = await Column.findOne({
      broad: id,
      index: destination.index,
    })

    sourceColumn.index = destination.index;
    sourceColumn.save();
    destinationColumn.index = source.index;
    destinationColumn.save();

    // sort column
    const columns = await Column.find({
      broad: id,
    }).sort("index");
    // update column broad
    broad.columns = columns;
    await broad.save();
  } else {
    if (source.droppableId === destination.droppableId) {
      const column = await Column.findOne({ id: source.droppableId });
      const sourceItems = await Item.findOne({ column: column._id, index: source.index });
      const destinationItems = await Item.findOne({ column: column._id, index: destination.index });

      sourceItems.index = destination.index;
      destinationItems.index = source.index;

      sourceItems.save();
      destinationItems.save();

      column.tasks = await Item.find({ column: column._id }).sort("index");
      column.save();
    } else {
      const sourceColumn = await Column.findOne({ id: source.droppableId });
      const destinationColumn = await Column.findOne({ id: destination.droppableId });

      const sourceItems = await Item.find({ column: sourceColumn._id });
      const destinationItems = await Item.find({ column: destinationColumn._id });

      // console.log(sourceItems, destinationItems);
      // return;

      const sourceItem = sourceItems.find((item) => item.index == source.index);
      const newSourceItems = sourceItems.filter((item) => item.index != source.index);
      destinationItems.splice(destination.index, 0, sourceItem);

      // console.log(newSourceItems);
      // console.log(destinationItems);

      newSourceItems.forEach((item, index) => {
        item.index = index;
        item.column = sourceColumn._id;
        item.save();
      });

      destinationItems.forEach((item, index) => {
        item.index = index;
        item.column = destinationColumn._id;
        item.save();
      });

      sourceColumn.tasks = newSourceItems;
      destinationColumn.tasks = destinationItems;

      sourceColumn.save();
      destinationColumn.save();
    }
  }
  
  return broad;
}

export const updateItem = async ({ id, content, status }) => {
  const item = await Item.findByIdAndUpdate(id, {
    content: content,
    status: status,
  }, { new: true });

  return item;
}

export const addColumn = async ({ id, title, columnId }) => {
  const broad = await Broad.findById(id);
  const columns = await Column.find({ broad: id }).sort("index").exec();
  const newColumn = {
    title: title,
    index: columns.length,
    broad: id,
    id: columnId,
  }
  const column = new Column(newColumn);
  await column.save();
  console.log(columns);
  columns.push(column);
  broad.columns = columns;
  await broad.save();

  return broad;
}

export const addItem = async ({ id, content, status }) => {
  const column = await Column.findOne({ id: id });

  const items = await Item.find({ column: column._id }).sort("index");
  const newItem = {
    content: content,
    status: status,
    index: items.length,
    column: column._id,
  }

  const item = new Item(newItem);
  await item.save();

  items.push(item);

  column.tasks = items;
  await column.save();

  return column;
}
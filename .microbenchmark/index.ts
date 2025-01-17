import { microbenchmark, run } from "./utils";

import { Guard } from "../apps/backend/src/shared/core/guard";
import { ImageMapper } from "../apps/backend/src/modules/image/mappers/image.mapper";
import { ImageGroupMapper } from "../apps/backend/src/modules/image-group/mappers/image-group.mapper";
import { Image } from "../apps/backend/src/modules/image/entity/image.entity";
import { EntityId } from "../apps/backend/src/shared/domain/entity-id";
import { Types } from "mongoose";
import { ImageGroup } from "../apps/backend/src/modules/image-group/entity/image-group.entity";
import { ImageVariantMapper } from "../apps/backend/src/modules/image-group/mappers/image-variant.mapper";
import { ImageVariant } from "../apps/backend/src/modules/image-group/entity/image-variant.entity";
import { AcceptImageFormat } from "../apps/backend/src/modules/serve/domain/accept-image-format";
import { VariantFit } from "../apps/backend/src/modules/image-group/domain/variant-fit";
import { VariantName } from "../apps/backend/src/modules/image-group/domain/variant-name";
import { VariantDimention as VariantDimension } from "../apps/backend/src/modules/image-group/domain/variant-dimention";
import { AddImageUseCase } from "../apps/backend/src/modules/image/use-cases/add-image/add-image.use-case";
import { GetImageUseCase } from "../apps/backend/src/modules/image/use-cases/get-image/get-image.use-case";
import { ListImagesUseCase } from "../apps/backend/src/modules/image/use-cases/list-images/list-images.use-case";
import { DeleteImageUseCase } from "../apps/backend/src/modules/image/use-cases/delete-image/delete-image.use-case";
import { ImageRepository } from "../apps/backend/src/modules/image/repos/image.repo";

microbenchmark("Guard.ensureWithArrayOfStrings", () => {
  Guard.ensureWithArrayOfStrings("ccc", ["str", "abc", "xyz", "ttt", "ccc"]);
});

microbenchmark("Guard.ensureObject", () => {
  Guard.ensureObject({ a: "b", c: 120, obj: {} });
});

const image = Image.create(
  {
    blob: "blob_str",
    group: "group_str",
    uploaded: new Date(),
  },
  new EntityId()
);
microbenchmark("ImageMapper.toDto", () => {
  ImageMapper.toDto(image);
});
microbenchmark("ImageMapper.toPersistence", () => {
  ImageMapper.toPersistence(image);
});

const imageRaw = {
  blob: "blob_str",
  group: "group_str",
  uploaded: new Date(),
  _id: new Types.ObjectId(),
};
microbenchmark("ImageMapper.toDomain", () => {
  ImageMapper.toDomain(imageRaw);
});

const imageGroup = ImageGroup.create(
  {
    name: "name_str",
    variants: [],
  },
  new EntityId()
);
microbenchmark("ImageGroupMapper.toDto", () => {
  ImageGroupMapper.toDto(imageGroup);
});
microbenchmark("ImageGroupMapper.toPersistence", () => {
  ImageGroupMapper.toPersistence(imageGroup);
});

const imageGroupRaw = {
  name: "name_str",
  variants: [],
  _id: new Types.ObjectId(),
};
microbenchmark("ImageGroupMapper.toDomain", () => {
  ImageGroupMapper.toDomain(imageGroupRaw);
});

const imageVariant = ImageVariant.create(
  {
    name: "name_str",
    fit: "cover",
    width: 120,
    height: 150,
  },
  new EntityId()
);
microbenchmark("ImageVariantMapper.toDto", () => {
  ImageVariantMapper.toDto(imageVariant);
});

microbenchmark("ImageVariantMapper.toPersistence", () => {
  ImageVariantMapper.toPersistence(imageVariant);
});

const imageVariantRaw = {
  name: "name_str",
  fit: "cover",
  width: 120,
  height: 150,
  _id: new Types.ObjectId(),
};
microbenchmark("ImageVariantMapper.toDomain", () => {
  ImageVariantMapper.toDomain(imageVariantRaw);
});

const accepts = [
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
];
microbenchmark("AcceptImageFormat.create", () => {
  AcceptImageFormat.create(accepts[Math.floor(Math.random() * accepts.length)]);
});

microbenchmark("VariantFit.create", () => {
  VariantFit.create("inside");
});

microbenchmark("VariantDimension.create", () => {
  VariantDimension.create(200);
});

microbenchmark("Guard.ensureInteger", () => {
  Guard.ensureInteger(2236543);
});

microbenchmark("VariantName.create", () => {
  VariantName.create("very_good_variant_name_to_test_performance");
});

const dummyImageRepo: ImageRepository = {
  save(image) {
    return Promise.resolve();
  },
  getImage(id) {
    return Promise.resolve(
      Image.create({
        blob: "blob_str",
        group: "group_str",
        uploaded: new Date(),
      })
    );
  },
  delete(image) {
    return Promise.resolve();
  },
  getImages() {
    return Promise.resolve([]);
  },
};

const addImageUseCase = new AddImageUseCase(dummyImageRepo);
microbenchmark("AddImageUseCase.execute", () => {
  addImageUseCase.execute({
    blob: "blob_str",
    group: "group_str",
  });
});

const getImageUseCase = new GetImageUseCase(dummyImageRepo);
microbenchmark("GetImageUseCase.execute", () => {
  getImageUseCase.execute({
    id: "some_id",
  });
});

const deleteImageUseCase = new DeleteImageUseCase(dummyImageRepo);
microbenchmark("DeleteImageUseCase.execute", () => {
  deleteImageUseCase.execute({
    id: "some_id",
  });
});

const listImageUseCase = new ListImagesUseCase(dummyImageRepo);
microbenchmark("ListImagesUseCase.execute", () => {
  listImageUseCase.execute();
});

run();

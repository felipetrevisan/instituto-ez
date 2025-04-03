import { MdPages, MdSettings } from "react-icons/md";
import { StructureBuilder } from "sanity/structure";

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content Manager")
    .items([
      // Settings section
      S.listItem()
        .title("Settings")
        .icon(MdSettings)
        .child(
          S.list()
            .title("Settings")
            .items([
              S.listItem()
                .title("Settings")
                .child(S.document().schemaType("siteConfig").documentId("siteConfig")),
              S.listItem().title("Navigation").child(S.documentTypeList("navigation")),
            ])
        ),

      S.listItem()
        .title("Home")
        .icon(MdSettings)
        .child(
          S.list()
            .title("Home")
            .items([
              S.listItem().title("Banner").child(S.documentTypeList("banner")),
              S.divider(),
              S.listItem().title("Atendimentos").child(S.documentTypeList("service")),
              S.listItem().title("Workshops").child(S.documentTypeList("workshop")),
              S.listItem().title("Imersão").child(S.document().schemaType("immersion").documentId("immersion")),
              S.listItem().title("Mentoria Avançanda").child(S.document().schemaType("advanced-mentory").documentId("advanced-mentory")),
              S.listItem().title("Palestras").child(S.documentTypeList("lecture")),
              S.listItem().title("Matematizador").child(S.documentTypeList("mathematizer")),
              S.listItem().title("Treinamentos").child(S.documentTypeList("training")),
              S.listItem().title("Depoimentos").child(S.documentTypeList("testimonial")),
            ])
        ),

      S.divider(),

      S.listItem().title("Pages").icon(MdPages).child(S.documentTypeList("page")),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "siteConfig",
            "navigation",
            "page",
            "about",
            "banner",
            "service",
            "workshop",
            "immersion",
            "lecture",
            "mathematizer",
            "training",
            "testimonial",
          ].includes(listItem.getId() || "")
      ),
    ]);

export default structure;

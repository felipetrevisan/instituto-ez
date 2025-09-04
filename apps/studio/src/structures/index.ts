import { BookIcon, CogIcon, PackageIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import type { ConfigContext } from 'sanity'
import type { StructureBuilder } from 'sanity/structure'

const structure = (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title('Content Manager')
    .items([
      // Settings section
      S.listItem()
        .title('Configurações')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configurações')
            .items([
              S.listItem()
                .title('Configurações')
                .child(S.document().schemaType('siteConfig').documentId('siteConfig')),
              S.listItem().title('Navegação').child(S.documentTypeList('navigation')),
            ]),
        ),

      S.listItem()
        .title('Home')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Home')
            .items([
              S.listItem().title('Banner').child(S.documentTypeList('banner')),
              S.divider(),
              orderableDocumentListDeskItem({
                type: 'service',
                title: 'Atendimentos',
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: 'workshop',
                title: 'Workshops',
                S,
                context,
              }),
              S.listItem()
                .title('Imersão')
                .child(S.document().schemaType('immersion').documentId('immersion')),
              S.listItem()
                .title('Mentoria Avançanda')
                .child(S.document().schemaType('advanced-mentory').documentId('advanced-mentory')),
              orderableDocumentListDeskItem({
                type: 'lecture',
                title: 'Palestras',
                S,
                context,
              }),
              S.listItem()
                .title('Serviços para Empresas')
                .child(S.documentTypeList('mathematizer')),
              orderableDocumentListDeskItem({
                type: 'testimonial',
                title: 'Depoimentos',
                S,
                context,
              }),
            ]),
        ),

      S.divider(),

      S.listItem().title('Páginas').icon(PackageIcon).child(S.documentTypeList('page')),

      S.divider(),
      S.listItem()
        .title('Ebooks')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Ebooks')
            .items([
              orderableDocumentListDeskItem({
                type: 'ebook',
                title: 'Catálogo',
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: 'ebooks-collection',
                title: 'Coleções',
                S,
                context,
              }),
              S.listItem()
                .title('Configurações')
                .child(
                  S.document()
                    .schemaType('landing-page-settings')
                    .documentId('landing-page-settings')
                    .title('Configurações'),
                ),
            ]),
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteConfig',
            'navigation',
            'page',
            'section',
            'about',
            'logo',
            'banner',
            'service',
            'workshop',
            'immersion',
            'lecture',
            'mathematizer',
            'ebook',
            'ebooks-collection',
            'testimonial',
            'advanced-mentory',
            'formGeneralSettings',
            'landing-page-settings',
            'landing-page-section',
          ].includes(listItem.getId() || ''),
      ),
    ])

export default structure

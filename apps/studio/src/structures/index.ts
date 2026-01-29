import { BookIcon, CogIcon, CommentIcon, PackageIcon, PlayIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import type { ConfigContext } from 'sanity'
import type { StructureBuilder } from 'sanity/structure'

const structure = (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title('Content Manager')
    .items([
      S.listItem()
        .title('Configurações')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configurações')
            .items([
              S.listItem()
                .title('Site')
                .child(S.document().schemaType('siteConfig').documentId('siteConfig')),
              S.listItem().title('Navegação').child(S.documentTypeList('navigation')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Páginas')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Páginas')
            .items([
              S.listItem()
                .title('Páginas')
                .child(S.documentTypeList('page').filter('_type == "page" && type == "page"')),
              S.listItem().title('Landing Pages').child(S.documentTypeList('landingPage')),
            ]),
        ),

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
                type: 'ebooks.category',
                title: 'Categorias',
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

      S.listItem()
        .title('Webnarios')
        .icon(PlayIcon)
        .child(
          S.list()
            .title('Webnarios')
            .items([
              orderableDocumentListDeskItem({
                type: 'webnario.catalog',
                title: 'Webnarios',
                S,
                context,
              }),
              S.listItem()
                .title('Configurações')
                .child(
                  S.document()
                    .schemaType('webnario-landing-page-settings')
                    .documentId('webnario-landing-page-settings')
                    .title('Configurações'),
                ),
            ]),
        ),

      S.listItem()
        .title('Depoimentos')
        .icon(CommentIcon)
        .child(
          S.list()
            .title('Webnarios')
            .items([
              orderableDocumentListDeskItem({
                type: 'testimonial',
                title: 'Depoimentos',
                S,
                context,
              }),
            ]),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteConfig',
            'navigation',
            'page',
            'landingPage',
            'landing-page-settings',
            'webnario-landing-page-settings',
            'webnario.catalog',
            'ebook',
            'ebooks.category',
            'testimonial',
            'section',
            'formGeneralSettings',
            'landing-page-section',
            'logo'
          ].includes(listItem.getId() || ''),
      ),
    ])

export default structure

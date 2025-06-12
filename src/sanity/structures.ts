import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { MdPages, MdSettings } from 'react-icons/md';
import type { ConfigContext } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';

const structure = (S: StructureBuilder, context: ConfigContext) =>
	S.list()
		.title('Content Manager')
		.items([
			// Settings section
			S.listItem()
				.title('Settings')
				.icon(MdSettings)
				.child(
					S.list()
						.title('Settings')
						.items([
							S.listItem()
								.title('Settings')
								.child(
									S.document()
										.schemaType('siteConfig')
										.documentId('siteConfig'),
								),
							S.listItem()
								.title('Navigation')
								.child(S.documentTypeList('navigation')),
						]),
				),

			S.listItem()
				.title('Home')
				.icon(MdSettings)
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
								.child(
									S.document().schemaType('immersion').documentId('immersion'),
								),
							S.listItem()
								.title('Mentoria Avançanda')
								.child(
									S.document()
										.schemaType('advanced-mentory')
										.documentId('advanced-mentory'),
								),
							orderableDocumentListDeskItem({
								type: 'lecture',
								title: 'Palestras',
								S,
								context,
							}),
							S.listItem()
								.title('Matematizador')
								.child(S.documentTypeList('mathematizer')),
							orderableDocumentListDeskItem({
								type: 'ebook',
								title: 'Ebooks',
								S,
								context,
							}),
							orderableDocumentListDeskItem({
								type: 'testimonial',
								title: 'Depoimentos',
								S,
								context,
							}),
						]),
				),

			S.divider(),

			S.listItem()
				.title('Pages')
				.icon(MdPages)
				.child(S.documentTypeList('page')),

			S.divider(),
			...S.documentTypeListItems().filter(
				(listItem) =>
					![
						'siteConfig',
						'navigation',
						'page',
						'section',
						'about',
						'banner',
						'service',
						'workshop',
						'immersion',
						'lecture',
						'mathematizer',
						'ebook',
						'testimonial',
						'advanced-mentory',
					].includes(listItem.getId() || ''),
			),
		]);

export default structure;

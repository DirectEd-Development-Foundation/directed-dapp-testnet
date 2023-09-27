import { DonorLayout, StudentMilestone } from '../../../components'
// import { GetServerSideProps } from 'next';

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
// 	// Redirect all users unconditionally
// 	return {
// 		redirect: {
// 			destination: '/', // Redirect to DirectEd Homepage
// 			permanent: false,
// 		},
// 	};
// };
type Props = {}

const Bootcamp = (props: Props) => {
	return (
		<DonorLayout>

		<main className='bootcamp-section'>
			<section>
				<h3>Access the DirectEd Bootcamp Course</h3>
				<div className='bootcamp-section__info'>
					<div className='bootcamp-section__details'>
						<p>To access the DirectEd Bootcamp content, send an email to <a href="mailto:edu@directed.dev">edu@directed.dev</a> to be added to all study materials, then follow the link <a href="https://directed.notion.site/DirectEd-Bootcamp-2023-be6da237c8ce423588620f78e69292d1">Here</a></p>
					</div>
				</div>
			</section>
		</main>
		</DonorLayout>

	)
}

export default Bootcamp

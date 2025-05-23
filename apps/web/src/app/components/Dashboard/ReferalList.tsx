export default function ReferalList({ referrals }: { referrals: any[] }) {
    return (
        <section className="w-full mt-12">
        <h2 className="text-2xl font-semibold mb-2 border-b pb-2 border-gray-300">
          Users Who Joined With Your Referral
        </h2>
        <p className="text-green-600 font-medium mb-6">
          🎉 Congratulations! You’ve helped bring these awesome people on board:
        </p>

        {referrals.length === 0 ? (
          <p className="text-gray-600">
            No users have joined with your referral yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {referrals.map(({ id, name, email }) => (
              <li
                key={id}
                className="p-4 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <p className="font-medium text-lg">{name}</p>
                <p className="text-gray-500 text-sm">{email}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    )
}

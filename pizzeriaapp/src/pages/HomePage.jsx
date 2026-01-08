import Navbar from "../components/Navbar"

const HomePage = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <h1 className="page-title">Our story</h1>

                <p className="text">
                    We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
                </p>
                <p className="text">
                    Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the softest, cheesiest, crunchiest, butteriest Dorfmino's Fresh Pan Pizza. They have been leaving the stage in the middle of a performance and even finding excuses to be disqualified in a football match.
                </p>
                <p className="text">
                    We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
                </p>

                <div className="section">
                    <img
                        src="https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg"
                        alt="Ingredients"
                    />

                    <div>
                        <h2 className="section-title">Ingredients</h2>
                        <p className="text">
                            We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir. While they're still young and fresh-that's our motto. It makes the kitchen a better place
                        </p>
                    </div>
                </div>

                <div className="section reverse">
                    <div>
                        <h2 className="section-title">Our Chefs</h2>
                        <p className="text">
                            They make sauces sing and salads dance. They create magic with skill, knowledge, passion, and stirring spoons (among other things). They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you.
                        </p>
                    </div>

                    <img
                        src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg"
                        alt="Chef"
                    />
                </div>

                <div className="delivery">
                    <img
                        src="https://images.unsplash.com/photo-1599981819329-31f250c3bc75?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Timer"
                    />
                    <h3>45 min delivery</h3>
                </div>
            </div>

            <footer className="footer">
                © 2017 Pizzeria. All rights reserved.
            </footer>
        </>
    );
};

export default HomePage;

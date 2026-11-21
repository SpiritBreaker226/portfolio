import { FC } from 'react'
import styled from 'styled-components'

import { Blog } from '../Blog'
import { ButtonLink, Posts } from '../Components'
import { config } from '../config'

const Hero = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 28px;
  padding: 36px 0 48px;

  ${({ theme }) => theme.media.tablet} {
    gap: 48px;
    padding-top: 72px;
  }
`

const Photo = styled.img`
  width: 180px;
  height: 180px;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.surfaceAlt};

  ${({ theme }) => theme.media.tablet} {
    width: 220px;
    height: 220px;
  }
`

const HeroText = styled.div`
  flex: 1 1 380px;
  min-width: 0;
`

const Eyebrow = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  margin-bottom: 16px;
`

const Lead = styled.p`
  max-width: 60ch;
  margin-bottom: 28px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.muted};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const Section = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const AboutMe = styled(Section)`
  padding: 40px 0;

  h2 {
    margin-bottom: 16px;
  }
`

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 68ch;
`

const LatestPosts = styled(Section)`
  padding: 40px 0 64px;
`

const LatestPostsHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px 16px;
  margin-bottom: 20px;
`

export const About: FC = () => (
  <>
    <Hero>
      <Photo src="/image/home.png" alt={config.developerName} />

      <HeroText>
        <Eyebrow>Senior Full-Stack Engineer · Vancouver, BC</Eyebrow>
        <Title>Hi, I'm Jason. I love solving challenging puzzles.</Title>
        <Lead>
          15+ years building customer-facing web apps in TypeScript, React,
          Node.js and Ruby on Rails, with a focus on reliability, testing and
          mentoring the teams around me.
        </Lead>

        <Actions>
          <ButtonLink to="/portfolio" $variant="primary">
            View portfolio
          </ButtonLink>
          <ButtonLink to="/blog" $variant="secondary">
            Read the blog
          </ButtonLink>
        </Actions>
      </HeroText>
    </Hero>

    <AboutMe>
      <h2>About me</h2>

      <Bio>
        <p>
          Growing up, my dad brought home our first computer, and I was hooked.
          I used to break the operating system just to see how it worked, and I
          could reinstall it in five minutes, so my family never found out what
          I was up to.
        </p>
        <p>
          I still break things to see how they work. These days I just do it on
          purpose, with tests. I like working with teams that care about craft:
          full-stack development, good testing and the tools that make
          developers faster. The part of the job I enjoy most is helping a
          teammate get unstuck, whether that's TypeScript, a tricky test or a
          memory leak.
        </p>
        <p>
          I started my career in Ontario, and when I moved to Vancouver the
          mountains won me over. On most weekends you'll find me on the trails
          around the city. Mount Brunswick is my high point so far, literally.
        </p>
        <p>
          When I'm not outside, I'm usually gaming or reading science fiction
          and history.
        </p>
      </Bio>
    </AboutMe>

    <LatestPosts>
      <LatestPostsHeading>
        <h2>Latest posts</h2>
        <a href="https://dev.to/jstats" target="_blank" rel="noreferrer">
          All posts on DEV <span aria-hidden="true">→</span>
        </a>
      </LatestPostsHeading>

      <Blog>
        <Posts numberOfPosts={3} />
      </Blog>
    </LatestPosts>
  </>
)

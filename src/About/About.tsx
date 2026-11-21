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
      <h2>About Me</h2>

      <Bio>
        <p>
          Hi, my name is Jason. I am a web developer who loves solving
          challenging puzzles. The reason I got into programming is interesting.
          Growing up, my dad bought a Packard Bell 486 computer, and I was
          hooked immediately. I used to break Windows 3.1 to see how it worked.
          I could reinstall the OS in 5 minutes, so my family never found out
          what I was up to.
        </p>
        <p>
          I'm in search of my next professional opportunity. I am excited to tie
          together my drive to apply new and emerging technology tools at a
          company needing a creative, hard-working, and collaborative engineer.
          I feel I would be an excellent fit for your organization while
          supporting your needs in full-stack development, quality assurance,
          and tool enhancement.
        </p>
        <p>
          Offering nearly 15 years of experience in web development, software
          engineering, and frontend engineering, I have progressed to senior
          project roles and been part of many exciting initiatives. As a Senior
          Frontend Engineer with Rivian, I spearheaded several improvement
          projects to help staff and customers. My efforts included boosting
          testing, supporting developers, and elevating the customer interface
          of an online catalogue.
        </p>
        <p>
          Before moving to Vancouver, I launched my technical career in Ontario,
          where my professional highlights spanned website improvements, data
          management, new email system features, and other projects. All my work
          focused on helping my employers reach and retain customers.
        </p>
      </Bio>
    </AboutMe>

    <LatestPosts>
      <LatestPostsHeading>
        <h2>Latest Posts</h2>
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
